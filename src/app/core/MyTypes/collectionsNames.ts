const constCollectionNames = 
{
    USER: 'users',
} as const;

export type CollectionName = typeof constCollectionNames[keyof typeof constCollectionNames]
