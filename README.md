

# Learning-React-Native-Nodejs

# Multiple Environment: 
[Documentation](https://github.com/thongluonglib/Learning-React-Native-Nodejs/tree/main/MultiEnvironment/Client/MultiEnvApp#readme)

# Sentry: 
[Documentation](https://github.com/thongluonglib/Learning-React-Native-Nodejs/tree/main/Sentry/Client/sendtryproject#readme)

# Fastlane with Firebase distribute

[Documentation](https://github.com/thongluonglib/Learning-React-Native-Nodejs/tree/main/RNFastlane#readme)

# End To End testing with Detox

[Documentation](https://github.com/thongluonglib/Learning-React-Native-Nodejs/tree/main/EndToEndTest/Client/RNDetoxTest#readme)

# CICD Pipeline with GitHub action

[Documentation](https://github.com/thongluonglib/cicdproject/tree/main)




# Some Tips

## Click right Open Visual Studio Code on MacOS

[Tip](https://github.com/thongluonglib/Learning-React-Native-Nodejs/blob/main/Tips/click-right-open-vscode-on-mac.md)

## To skip worktree gradle.properties

```sh
git update-index --skip-worktree android/gradle.properties 
```

## To Use nvm choose version node

### Install node version
    
    ```sh
    nvm install 20.16.0  // <--- install Node version 20.16.0
    ```
    
### Get all version node nvm

```sh
    nvm ls
```

### Use specific node version

  ```sh
  nvm use x.y.z  // <--- use node version x.y.z
  ````
  
### Default node version

  ```sh
  nvm alias default x.y.z  //<--- use default version x.y.z 
  ```

## Docker
If you have Docker file, docker-compose on your project
Go to project docker-compose PATH
### Step 1. Build Docker Image
```sh
docker build -t onair-image .
```

### Step 2. Run Docker Image

```sh
docker run -p 3005:3005 -td onair-image
```

### Install Redis Image & Container

```sh
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
```
