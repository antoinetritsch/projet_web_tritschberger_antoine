import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(rawNum: string): string {

    if (rawNum == null) {
        return "";
    }

    let phone: string = rawNum;
    if (rawNum.charAt(0) === '+') {
        phone = phone.substr(4, phone.length - 3);
    }

    phone = phone.replace(/\s/g, '');
    let pipePhone: string;

    pipePhone = '+33 '.concat(phone.charAt(1)).concat(' ');

    for(let i: number = 2; i < phone.length; i += 2) {
      pipePhone = pipePhone.concat(' ').concat(phone.substr(i, 2));
    }

    return pipePhone;
}

}