import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';


@Injectable()
export class CallService {
private subject = new Subject<any>();

sendClickCall(message: string) {
    this.subject.next({ text: message });
}

getClickCall(): Observable<any> {
    return this.subject.asObservable();
}
}