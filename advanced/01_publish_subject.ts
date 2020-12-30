import {Observable, Subject} from "rxjs";

// if we have a subject defined EVERYONE can call the method "next" on this subject
// to avoid this we can use "asObservable"

const source$ = new Subject<string>();

// 1) this way the observable can be subscribed, which don't provide "next"
const observable1$ = source$.asObservable();

// 2) type the provided observable
const observable2$: Observable<string> = source$;
const observable3$ = source$ as Observable<string>;
// but this way it is still a Subject
(observable2$ as Subject<string>).next('my-string');

