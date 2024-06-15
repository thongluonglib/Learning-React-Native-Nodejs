How to install deep link

1. URI SCHEME
Android: npx uri-scheme add uripetproject --android
IOS: npx uri-scheme add uripetproject --ios

Test: npx uri-scheme open "uripetproject://" --android
Test: npx uri-scheme open "uripetproject://app/profile/:1000" --android
Test: npx uri-scheme open "uripetproject://" --ios