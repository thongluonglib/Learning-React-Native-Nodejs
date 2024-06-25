#import "RTNHelloWorld.h"

@implementation RTNHelloWorld

RCT_EXPORT_MODULE()

- (void)getHelloWorld: resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    NSString *result = [[NSString alloc] initWithChar:"Hello World"];
    resolve(result);
}
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeCalculatorSpecJSI>(params);
}

@end
