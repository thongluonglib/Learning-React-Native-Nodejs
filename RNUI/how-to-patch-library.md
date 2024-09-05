
## After, if you want change code at node_modules/react-native-snap-carousel let run to patch code
```sh
npx patch-package react-native-snap-carousel
```

## Use patch-package module already changed
 1. Add module 
 
 ```sh 
 npm install react-native-snap-carousel --save
 ```

2. Apply patch-package code already changed

```sh 
npx patch-package
```



## Nested packages
If you are trying to patch a package at, e.g. node_modules/package/node_modules/another-package you can just put a / between the package names:

```sh
npx patch-package package/another-package
```
It works with scoped packages too
```sh
npx patch-package @my/package/@my/other-package
```

Updating patches
Use exactly the same process as for making patches in the first place, i.e. make more changes, run patch-package, commit the changes to the patch file.

Applying patches
Run patch-package without arguments to apply all patches in your project.