export enum enumSex
{
    male =0,
    female
};

export enum enumProfile
{
    admin = 0,
    tester,
    user,
    invited,
}

export class TranslateEnums
{
    public static transalteSex(number : enumSex)
    {
        let word : string;

        switch(number)
        {
            case enumSex.male:
                word = 'Hombre'    
                break;

            case enumSex.female:
                word = 'Mujer'    
                break;
        }

        return word;
    }

    public static transalteProfile(number : enumProfile)
    {
        let word : string;

        switch(number)
        {
            case enumProfile.admin:
                word = 'Admin'    
                break;

            case enumProfile.tester:
                word = 'Tester'    
                break;

            case enumProfile.user:
                word = 'Usuario'    
                break;

            case enumProfile.invited:
                word = 'Invitado'    
                break;
        }

        return word;
    }
}