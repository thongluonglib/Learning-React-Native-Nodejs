import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRealm } from '@realm/react';
import { Profile } from '../realm/model/Profile';
import { BSON } from 'realm';

const Home = () => {
  const realm = useRealm();

  function addProfileByRealm() {
    let profile
    realm.write(() => {
      profile = realm.create(Profile, {
        _id: new BSON.ObjectId(),
        name: "Hello"
      })
    })
    console.log("Profile Added", profile)
  }
  async function findProfileById() {
    const profile = await realm.objectForPrimaryKey(Profile, BSON.ObjectId("66739cd85edd3caf551b6a5f"))
    console.log('findProfileById', JSON.stringify(profile, null, 2))
  }
  async function findProfileByName() {
    const name = "Hello"
    const profile = await realm.objects(Profile).filtered("name == $0", name)
    console.log('findProfileById', JSON.stringify(profile, null, 2))
  }

  async function updateProfileById() {
    realm.write(() => {
      const profile = realm.objectForPrimaryKey(Profile, BSON.ObjectId("66739cd85edd3caf551b6a5f"))
      profile.name = "Updated"
    })
    const profile = await realm.objectForPrimaryKey(Profile, BSON.ObjectId("66739cd85edd3caf551b6a5f"))
    console.log('profile updated: ', JSON.stringify(profile, null, 2))
  }

  async function deleteProfileById() {
    realm.write(() => {
      const profile = realm.objectForPrimaryKey(Profile, BSON.ObjectId("66739cd85edd3caf551b6a5f"))
      realm.delete(profile)
    })
    const profile = await realm.objectForPrimaryKey(Profile, BSON.ObjectId("66739cd85edd3caf551b6a5f"))
    console.log('profile updated: ', JSON.stringify(profile, null, 2))
  }

  return (
    <View>
      <Text>Home</Text>
      <Button title='Add Profile By Realm' onPress={addProfileByRealm} />
      <Button title='Find Profile By Id' onPress={findProfileById} />
      <Button title='Find Profile By Name' onPress={findProfileByName} />
      <Button title='Update Profile By Id' onPress={updateProfileById} />
      <Button title='Delete Profile By Id' onPress={deleteProfileById} />

    </View>
  )
}

export default Home

const styles = StyleSheet.create({})