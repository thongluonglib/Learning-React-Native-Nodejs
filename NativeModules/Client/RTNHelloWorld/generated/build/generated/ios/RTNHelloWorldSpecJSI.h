/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleH.js
 */

#pragma once

#include <ReactCommon/TurboModule.h>
#include <react/bridging/Bridging.h>

namespace facebook::react {


  class JSI_EXPORT NativeHelloWorldCxxSpecJSI : public TurboModule {
protected:
  NativeHelloWorldCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

public:
  virtual jsi::Value getHelloWorld(jsi::Runtime &rt, double a) = 0;

};

template <typename T>
class JSI_EXPORT NativeHelloWorldCxxSpec : public TurboModule {
public:
  jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propName) override {
    return delegate_.get(rt, propName);
  }

  static constexpr std::string_view kModuleName = "RTNHelloWorld";

protected:
  NativeHelloWorldCxxSpec(std::shared_ptr<CallInvoker> jsInvoker)
    : TurboModule(std::string{NativeHelloWorldCxxSpec::kModuleName}, jsInvoker),
      delegate_(reinterpret_cast<T*>(this), jsInvoker) {}

private:
  class Delegate : public NativeHelloWorldCxxSpecJSI {
  public:
    Delegate(T *instance, std::shared_ptr<CallInvoker> jsInvoker) :
      NativeHelloWorldCxxSpecJSI(std::move(jsInvoker)), instance_(instance) {}

    jsi::Value getHelloWorld(jsi::Runtime &rt, double a) override {
      static_assert(
          bridging::getParameterCount(&T::getHelloWorld) == 2,
          "Expected getHelloWorld(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::getHelloWorld, jsInvoker_, instance_, std::move(a));
    }

  private:
    T *instance_;
  };

  Delegate delegate_;
};

} // namespace facebook::react
