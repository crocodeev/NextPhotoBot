class Test {

    constructor(token){

        if(!!Test.instance){
            console.log('instance already create');
            return Test.instance;
        }

        Test.instance = this;
        this.token = token;
        this.bot
    }

    init(){
        console.log("TOKEN");
        this.bot = { token: this.token}
    }
}

const test = new Test('123qwe');

test.init();

console.log(test.bot);

const test2 = new Test();

console.log(test2.bot);

