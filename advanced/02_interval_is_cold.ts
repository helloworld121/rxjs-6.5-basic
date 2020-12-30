import {interval} from "rxjs";

// this example displays that interval is cold
// because as soon as I subscribe with the second call a new Interval is started

const source$ = interval(500);

const sub1 = source$.subscribe(f => console.log(1, f));
// sub1.unsubscribe();

setTimeout(() => {
    const sub2 = source$.subscribe(f => console.log(2, f));
}, 2000);
