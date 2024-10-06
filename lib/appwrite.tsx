import { Account, Client, ID, Databases, Query } from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kevin.finance',
    projectId: '66e16b0d002234572393',
    databaseId: '66fa4ddf001b9f89402f',
    userCollectionId: '66fa4e4a00324e9f9e7b',
    scheduleCollectionId: '66ff73d2003c9acac8d9',
    attendanceCollectionId: '66eaec210018018538d2',
    storageId: '66e22cd40011d8cdf4b1'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your proj ect ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client)

type authUser = {
    accountId: string,
    username: string;

}

// Register User
export const createUser = async (username: string, email: string, password: string): Promise<authUser | undefined> => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw Error;

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username,
                email
            }
        )
        return {
            accountId: newUser.accountId,
            username: newUser.username
        };
    } catch (error) {
        console.log(error);
        throw new Error(error as string);
    }
}

// Login User
export const authUser = async ({ email, password }:
    {
        email: string,
        password: string
    }
) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error as string);
    }
}

// Get User ID
export const getCurrentUser = async (): Promise<authUser | undefined> => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        if (!currentUser) throw Error;
        const userDocument = currentUser.documents[0]
        return {
            accountId: userDocument.accountId,
            username: userDocument.username,
        }

    } catch (error) {
        console.log(error)
        throw new Error(error as string)
    }
}

// get Work Schedule
export const getWorkSchedule = async (username: string) => {
    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.scheduleCollectionId,
            [Query.equal("username", username)]
        )

        if (response) {
            return response.documents[0]
        }

    } catch (error) {
        console.log(error)
        throw new Error(error as string);
    }

}

// add a new work schedule 
export const addWorkSchedule = async ({ username, schedule }: {
    username: string,
    schedule: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    }
}) => {
    try {
        const newSchedule = await databases.createDocument(
            config.databaseId,
            config.scheduleCollectionId,
            ID.unique(),
            {
                username,
                ...schedule,
            }
        )
        return newSchedule;
    } catch (error) {
        console.log(error);
        throw new Error(error as string)
    }
}


// check user Attandance
export const addAttendance = async ({ userId, status, earnings, hoursWorked }: {
    userId: string,
    status: string,
    earnings: number,
    hoursWorked: number
}) => {
    try {
        const newAttendance = await databases.createDocument(
            config.databaseId,
            config.scheduleCollectionId,
            ID.unique(),
            {
                userId, status, earnings, hoursWorked
            }
        )
        return newAttendance
    } catch (error) {
        console.log(error);
        throw new Error(error as string)
    }
}



