describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have step-one screen', async () => {
    await expect(element(by.id('step-one'))).toBeVisible();
  });
});
