import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    //noinspection TypeScriptUnresolvedFunction
    let password = AC.get('password').value; // to get value in input tag
    //noinspection TypeScriptUnresolvedFunction
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if(password != confirmPassword) {
      console.log('false');
      //noinspection TypeScriptUnresolvedFunction
      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      console.log('true');
      return null
    }
  }
}
