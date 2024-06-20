import { createRealmContext } from "@realm/react";
import Realm, { BSON, ObjectSchema } from "realm";

// Define your object model
export class Profile extends Realm.Object<Profile> {
    _id!: BSON.ObjectId;
    name!: string;
    static schema: ObjectSchema = {
        name: 'Profile',
        properties: {
            _id: 'objectId',
            name: { type: 'string', indexed: 'full-text' },
        },
        primaryKey: '_id',
    };
}
export const profileConfig: Realm.Configuration = {
    schema: [Profile],
    // Increment the 'schemaVersion', since 'age' has been added to the schema.
    // The initial schemaVersion is 0.
    schemaVersion: 4,
    // using when add new field fullName in model Profile
    // onMigration: (oldRealm, newRealm) => {
    //     // only apply this change if upgrading schemaVersion
    //     if (oldRealm.schemaVersion < 1) {
    //         const oldObjects = oldRealm.objects(Profile);
    //         const newObjects = newRealm.objects(Profile);
    //         // loop through all objects and set the fullName property in the
    //         // new schema
    //         for (const objectIndex in oldObjects) {
    //             const oldObject = oldObjects[objectIndex];
    //             const newObject = newObjects[objectIndex];
    //             newObject.fullName = `${oldObject.firstName} ${oldObject.lastName}`;
    //         }
    //     }
    // },
};
// export const {RealmProvider} = createRealmContext(profileConfig);
