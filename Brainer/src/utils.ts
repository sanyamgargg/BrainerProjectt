
export function randomgen(len:number){
    const options: string = "snfbdkfbskgbdsfbskgshjbgsjkdvbsd" ;

    var ans = "" ;
    for(let i = 0; i<len; i++){
        ans += options[Math.floor(Math.random()*options.length)] ;
    }
    return ans ;
}