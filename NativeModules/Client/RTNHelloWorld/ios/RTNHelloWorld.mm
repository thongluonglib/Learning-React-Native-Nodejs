#import "RTNHelloWorld.h"

@implementation RTNHelloWorld

RCT_EXPORT_MODULE()

- (void)getHelloWorld: (NSString *)a resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(a);
}
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeHelloWorldSpecJSI>(params);
}

@end
