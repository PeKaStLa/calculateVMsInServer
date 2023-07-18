// test file
// tsc main.ts --watch
// nodemon main.js

interface Server {
    cpu: number
    ram: number
    network: number
}

//Classes

class App {
    VMs: VM[] = [];
    saved_VMs: VM[] = [];
    saved_PS: PS[] = [];

    max_CPU: number
    max_RAM: number
    max_Network: number

    constructor(max_CPU: number, max_RAM: number, max_Network: number) {
        this.max_CPU = max_CPU
        this.max_RAM = max_RAM
        this.max_Network = max_Network
    }

    calculateFirstFit() {

        // solange die saved_VMs weniger sind als alle zu berechnenden VMs, solange rechne weiter
        while (this.saved_VMs.length < this.VMs.length) {

            let ps = new PS((this.saved_PS.length+1), this.max_CPU, this.max_RAM, this.max_Network);

            // nimm jede zu berechnende VM
            this.VMs.forEach(el => {

                console.log("im VMs.foreach")

                // wenn die aktuelle vm NICHT im saved_VMs-array ist, dann weiter in der Berechnung
                if (!this.saved_VMs.some(x => x == el)) {

                    console.log("nach der array.some")

                    if ((ps.cpu + el.cpu) <= ps.max_CPU && (ps.ram + el.ram) <= ps.max_RAM && (ps.network + el.network) <= ps.max_Network) {

                        ps.cpu += el.cpu;
                        ps.ram += el.ram;
                        ps.network += el.network;

                        this.saved_VMs.push(el);
                        ps.VMs.push(el)

                        console.log(this.saved_VMs.length)
                        console.log(this.saved_PS.length)
                    }
                }
            })

            this.saved_PS.push(ps)
            console.log("PS fertig berechnet: ", ps.id)

        }
        //console.log(this.saved_PS.map(x =>  x.VMs))
        this.saved_PS.forEach( PS => {
            console.log('\n' + PS.id + ' CPU: ' + PS.cpu  + ' RAM: ' + PS.ram + ' Network: ' + PS.network + ': \n')
            console.log(PS.VMs)
        })
    }
}

class VM implements Server {
    cpu: number
    ram: number
    network: number

    name: string

    constructor(name: string, cpu: number, ram: number, network: number) {
        this.cpu = cpu
        this.ram = ram
        this.network = network
        this.name = name

    }
}

class PS implements Server {
    id: number
    VMs: VM[] = []

    max_CPU: number
    max_RAM: number
    max_Network: number

    cpu: number = 0;
    ram: number = 0;
    network: number = 0;



    constructor(id: number, cpu: number, ram: number, network: number) {
        this.max_CPU = cpu
        this.max_RAM = ram
        this.max_Network = network
        this.id = id
    }
}

const app = new App(100, 100, 100);


const eins = new VM('eins', 25, 20, 22);
app.VMs.push(eins)
const zwei = new VM('zwei', 60, 40, 30)
app.VMs.push(zwei)
const dr = new VM('dr', 30, 70, 40);
app.VMs.push(dr)
const vi = new VM('vi', 30, 20, 40)
app.VMs.push(vi)
const fu = new VM('fu', 25, 20, 22);
app.VMs.push(fu)
const se = new VM('se', 60, 40, 30)
app.VMs.push(se)
const si = new VM('si', 30, 70, 40);
app.VMs.push(si)
const ac = new VM('ac', 30, 20, 40)
app.VMs.push(ac)
const ne = new VM('ne', 10, 20, 30);
app.VMs.push(ne)
const ze = new VM('ze', 30, 20, 10)
app.VMs.push(ze)
const el = new VM('el', 5, 10, 15);
app.VMs.push(el)
const zw = new VM('zw', 15, 10, 5)
app.VMs.push(zw)
const dz = new VM('dz', 6, 4, 2);
app.VMs.push(dz)
const vz = new VM('vz', 2, 4, 6)
app.VMs.push(vz)




app.calculateFirstFit();
