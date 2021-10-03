// provide difference between list of elements A and B
export function difference(A: Array<string>, B: Array<string>) {
    const arrA = A.map(x => x.toString());
    const arrB = B.map(x => x.toString());

    const result = [];
    for (const p of arrA) {
        if (arrB.indexOf(p) === -1) {
            result.push(p);
        }
    }

    return result;
}