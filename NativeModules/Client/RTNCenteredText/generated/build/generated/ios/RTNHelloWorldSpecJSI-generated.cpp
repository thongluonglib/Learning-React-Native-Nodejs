/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleCpp.js
 */

#include "RTNHelloWorldSpecJSI.h"

namespace facebook::react {

static jsi::Value __hostFunction_NativeHelloWorldCxxSpecJSI_getHelloWorld(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<NativeHelloWorldCxxSpecJSI *>(&turboModule)->getHelloWorld(
    rt,
    args[0].asString(rt)
  );
}

NativeHelloWorldCxxSpecJSI::NativeHelloWorldCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker)
  : TurboModule("RTNHelloWorld", jsInvoker) {
  methodMap_["getHelloWorld"] = MethodMetadata {1, __hostFunction_NativeHelloWorldCxxSpecJSI_getHelloWorld};
}


} // namespace facebook::react
