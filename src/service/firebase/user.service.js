import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage } from '../../config/firebase.config';

const USERS_COLLECTION = 'users';


export const saveUser = async (userData, profilePicture = null) => {
  try {
    // Generate a new document reference
    const userRef = doc(collection(db, USERS_COLLECTION));
    let dataToSave = { ...userData, id: userRef.id };

    // If profile picture exists, upload it first
    if (profilePicture) {
      const profilePicRef = ref(storage, `profilePictures/${userRef.id}`);
      const uploadResult = await uploadBytes(profilePicRef, profilePicture);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      // Add the profile picture URL to the data
      dataToSave.profilePictureURL = downloadURL;
    } else {
      // Set empty string if no profile picture
      dataToSave.profilePictureURL = '';
    }

    // Set creation timestamp
    dataToSave.createdAt = new Date();
    dataToSave.updatedAt = new Date();

    // Save user data to Firestore
    await setDoc(userRef, dataToSave);

    return dataToSave;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};


export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};


export const getAllUsers = async (options = {}) => {
  try {
    let usersQuery = collection(db, USERS_COLLECTION);

    // Apply role filter if provided
    if (options.role) {
      usersQuery = query(usersQuery, where("role", "==", options.role));
    }

    // Apply department filter if provided
    if (options.department) {
      usersQuery = query(usersQuery, where("department", "==", options.department));
    }

    // Apply faculty filter if provided
    if (options.faculty) {
      usersQuery = query(usersQuery, where("faculty", "==", options.faculty));
    }

    // Apply additional filters if provided
    if (options.filters && Array.isArray(options.filters)) {
      options.filters.forEach(filter => {
        usersQuery = query(usersQuery, where(filter.field, filter.operator, filter.value));
      });
    }

    // Apply ordering if provided
    if (options.orderBy) {
      usersQuery = query(usersQuery, orderBy(options.orderBy.field, options.orderBy.direction || 'asc'));
    } else {
      // Default ordering by creation date
      usersQuery = query(usersQuery, orderBy("createdAt", "desc"));
    }

    // Apply limit if provided
    if (options.limit) {
      usersQuery = query(usersQuery, limit(options.limit));
    }

    const querySnapshot = await getDocs(usersQuery);
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};


export const getAllStudents = async (options = {}) => {
  return getAllUsers({ ...options, role: 'student' });
};


export const getAllLecturers = async (options = {}) => {
  return getAllUsers({ ...options, role: 'lecturer' });
};


export const updateUser = async (userId, updateData, newProfilePicture = null) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    let dataToUpdate = { ...updateData, updatedAt: new Date() };

    // If new profile picture exists, upload it
    if (newProfilePicture) {
      const profilePicRef = ref(storage, `profilePictures/${userId}`);
      const uploadResult = await uploadBytes(profilePicRef, newProfilePicture);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      // Add the profile picture URL to the data
      dataToUpdate.profilePictureURL = downloadURL;
    }

    // Update user data in Firestore
    await updateDoc(userRef, dataToUpdate);

    // Get the updated document
    const updatedDoc = await getDoc(userRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


export const deleteUser = async (userId) => {
  try {
    // Delete the user document
    await deleteDoc(doc(db, USERS_COLLECTION, userId));

    // Try to delete the profile picture if it exists
    try {
      const profilePicRef = ref(storage, `profilePictures/${userId}`);
      await deleteObject(profilePicRef);
    } catch (storageError) {
      // Profile picture might not exist, so we can ignore this error
      console.log('No profile picture found or already deleted');
    }

    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


export const searchUsers = async (searchText, role = null) => {
  try {
    // Get all users (optionally filtered by role)
    const options = role ? { role } : {};
    const allUsers = await getAllUsers(options);

    if (!searchText || searchText.trim() === '') {
      return allUsers;
    }

    const searchTermLower = searchText.toLowerCase();

    // Fields to search in (common between students and lecturers)
    const searchFields = [
      'fullName',
      'email',
      'department',
      'faculty'
    ];

    // Role-specific fields
    const studentFields = ['studentId', 'degree', 'course', 'academicYear'];
    const lecturerFields = ['lecturerId', 'specialization'];

    return allUsers.filter(user => {
      // Search in common fields
      for (const field of searchFields) {
        if (user[field] && user[field].toString().toLowerCase().includes(searchTermLower)) {
          return true;
        }
      }

      // Search in role-specific fields
      let roleFields = user.role === 'student' ? studentFields : lecturerFields;
      for (const field of roleFields) {
        if (user[field] && user[field].toString().toLowerCase().includes(searchTermLower)) {
          return true;
        }
      }

      return false;
    });
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};


export const checkUserExists = async (email, username) => {
  try {
    // Check email
    const emailQuery = query(
      collection(db, USERS_COLLECTION),
      where("email", "==", email)
    );
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      return { exists: true, field: 'email' };
    }

    // Check username
    const usernameQuery = query(
      collection(db, USERS_COLLECTION),
      where("username", "==", username)
    );
    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      return { exists: true, field: 'username' };
    }

    return { exists: false };
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};


export const getUsersByDepartment = async (department, role = null) => {
  const options = {
    department,
    ...(role && { role })
  };

  return getAllUsers(options);
};


export const getUsersByFaculty = async (faculty, role = null) => {
  const options = {
    faculty,
    ...(role && { role })
  };

  return getAllUsers(options);
};


export const getLecturersBySpecialization = async (specialization) => {
  const options = {
    role: 'lecturer',
    filters: [{ field: 'specialization', operator: '==', specialization }]
  };

  return getAllUsers(options);
};


export const getStudentsByCourse = async (course) => {
  const options = {
    role: 'student',
    filters: [{ field: 'course', operator: '==', value: course }]
  };

  return getAllUsers(options);
};


export const getStudentsByAcademicYear = async (academicYear) => {
  const options = {
    role: 'student',
    filters: [{ field: 'academicYear', operator: '==', value: academicYear }]
  };

  return getAllUsers(options);
};


export const getStudentsByDegree = async (degree) => {
  const options = {
    role: 'student',
    filters: [{ field: 'degree', operator: '==', value: degree }]
  };

  return getAllUsers(options);
};