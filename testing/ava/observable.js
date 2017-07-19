import test from 'ava';
import {Observable} from 'rxjs';

test(t => {
    t.plan(3);
    return Observable
        .of(1, 2, 3, 4, 5, 6)
        .filter(n => {
            return n % 2 === 0;
        })
        .map(() => t.pass());
});
