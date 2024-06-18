import Realm from "realm";

export class User extends Realm.Object {
    static schema = {
        name: "User",
        properties: {
            _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
            userName: "string",
            password: "string",
            dayofBirth: "string?",
            createDate: { type: "date", default: () => new Date()},
            status: "string?",
            owner_id: "string?",
        },
        primaryKey: "_id",
    };
}

export const realm = await Realm.open({
    path: "db/localOnly.realm",
    schema: [User],
});