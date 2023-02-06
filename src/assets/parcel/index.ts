export const parcelBody = JSON.stringify(
  {
    extends: '@parcel/config-default',
    resolvers: ['parcel-resolver-ts-base-url', '...'],
  },
  null,
  '\t'
);
