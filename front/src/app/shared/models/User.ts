class User {
    name: string;
    lastname: string;
    address: string;
    codePostal: number;
    city: string;
    civilite: string;
    login: string;
    country: string;
    old : number;
    phoneNumber:string;
    password:string;

    constructor(name: string, lastname: string,old:number,phoneNumber:string,address: string,codePostal: number,city: string,login: string,civilite: string,country: string,password: string) {
        this.name = name;
        this.lastname = lastname;
        this.old=old;
        this.phoneNumber=phoneNumber;
        this.address=address;
        this.codePostal=codePostal;
        this.city=city;
        this.country=country;
        this.login=login;
        this.civilite=civilite;    
        this.password=password;    
    }

    ToString():string{
        return this.name+" "+this.lastname+" "+this.old+" "+this.phoneNumber;
    }
    IsNull():boolean{
        return this.name=="" && this.lastname==""&& this.old==0 && this.phoneNumber=="" && this.address=="" && this.codePostal==0 && this.city=="" && this.country=="" && this.login=="" && this.password=="" && this.civilite=="";
    }
    IsNameCorrect():String{
        if(this.name.length>0 && this.name == this.name.toUpperCase()){
            return '';
        }
        else{
            return "Nom en majuscule !!";
        }
    }
    IsLastNameCorrect():String{
        if(this.lastname.length>0){
            return '';
        }
        return "Prénom obligatoire";
    }
    IsOldCorrect():String{
        if(this.old>=0){
            return '';
        }
        return "Age supérieur à 0 !";
    }
    IsNumberCorrect():String{
        if(this.phoneNumber.toString().length==10){
            return '';
        }
        return "Pas le bon numéro de téléphone";
    }

    IsLoginCorrect():String{
        if(this.login.toString().length>4){
            return '';
        }
        return "Votre login doit être supérieur à 4 caractères";
    }

    IsPasswordCorrect():String{
        if(this.password.toString().length>8){
            return '';
        }
        return "Le mot de passe doit être supérieur à 8";
    }

    IsCiviliteCorrect():String{
        if(this.civilite!=""){
            return '';
        }
        return "Veuillez choisir une civilité";
    }


    IsCorrect():String{
        var nameVerif : String =this.IsNameCorrect();
        var lastnameVerif : String =this.IsLastNameCorrect();
        var oldVerif : String =this.IsOldCorrect();
        var numberVerif : String =this.IsNumberCorrect();

        var loginVerif : String =this.IsLoginCorrect();
        var passwordVerif : String =this.IsPasswordCorrect();

        var civiliteVerif : String =this.IsCiviliteCorrect();

        if(nameVerif!=''){
            return nameVerif;
        }

        if(lastnameVerif!=''){
            return lastnameVerif;
        }

        if(oldVerif!=''){
            return oldVerif;
        }

        if(numberVerif!=''){
            return numberVerif;
        }

        if(loginVerif!=''){
            return loginVerif;
        }

        if(passwordVerif!=''){
            return passwordVerif;
        }

        if(civiliteVerif!=''){
            return civiliteVerif;
        }
        return '';
    }
}
export default User;