// test file
// tsc main.ts --watch
// nodemon main.js
//Classes
var App = /** @class */ (function () {
    function App(max_CPU, max_RAM, max_Network) {
        this.VMs = [];
        this.saved_VMs = [];
        this.saved_PS = [];
        this.max_CPU = max_CPU;
        this.max_RAM = max_RAM;
        this.max_Network = max_Network;
    }
    App.prototype.calculateFirstFit = function () {
        var _this = this;
        var _loop_1 = function () {
            var ps = new PS((this_1.saved_PS.length + 1), this_1.max_CPU, this_1.max_RAM, this_1.max_Network);
            // nimm jede zu berechnende VM
            this_1.VMs.forEach(function (el) {
                console.log("im VMs.foreach");
                // wenn die aktuelle vm NICHT im saved_VMs-array ist, dann weiter in der Berechnung
                if (!_this.saved_VMs.some(function (x) { return x == el; })) {
                    console.log("nach der array.some");
                    if ((ps.cpu + el.cpu) <= ps.max_CPU && (ps.ram + el.ram) <= ps.max_RAM && (ps.network + el.network) <= ps.max_Network) {
                        ps.cpu += el.cpu;
                        ps.ram += el.ram;
                        ps.network += el.network;
                        _this.saved_VMs.push(el);
                        ps.VMs.push(el);
                        console.log(_this.saved_VMs.length);
                        console.log(_this.saved_PS.length);
                    }
                }
            });
            this_1.saved_PS.push(ps);
            console.log("PS fertig berechnet: ", ps.id);
        };
        var this_1 = this;
        // solange die saved_VMs weniger sind als alle zu berechnenden VMs, solange rechne weiter
        while (this.saved_VMs.length < this.VMs.length) {
            _loop_1();
        }
        //console.log(this.saved_PS.map(x =>  x.VMs))
        this.saved_PS.forEach(function (PS) {
            console.log('\n' + PS.id + ' CPU: ' + PS.cpu + ' RAM: ' + PS.ram + ' Network: ' + PS.network + ': \n');
            console.log(PS.VMs);
        });
    };
    return App;
}());
var VM = /** @class */ (function () {
    function VM(name, cpu, ram, network) {
        this.cpu = cpu;
        this.ram = ram;
        this.network = network;
        this.name = name;
    }
    return VM;
}());
var PS = /** @class */ (function () {
    function PS(id, cpu, ram, network) {
        this.VMs = [];
        this.cpu = 0;
        this.ram = 0;
        this.network = 0;
        this.max_CPU = cpu;
        this.max_RAM = ram;
        this.max_Network = network;
        this.id = id;
    }
    return PS;
}());
var app = new App(100, 100, 100);
var eins = new VM('eins', 25, 20, 22);
app.VMs.push(eins);
var zwei = new VM('zwei', 60, 40, 30);
app.VMs.push(zwei);
var dr = new VM('dr', 30, 70, 40);
app.VMs.push(dr);
var vi = new VM('vi', 30, 20, 40);
app.VMs.push(vi);
var fu = new VM('fu', 25, 20, 22);
app.VMs.push(fu);
var se = new VM('se', 60, 40, 30);
app.VMs.push(se);
var si = new VM('si', 30, 70, 40);
app.VMs.push(si);
var ac = new VM('ac', 30, 20, 40);
app.VMs.push(ac);
var ne = new VM('ne', 10, 20, 30);
app.VMs.push(ne);
var ze = new VM('ze', 30, 20, 10);
app.VMs.push(ze);
var el = new VM('el', 5, 10, 15);
app.VMs.push(el);
var zw = new VM('zw', 15, 10, 5);
app.VMs.push(zw);
var dz = new VM('dz', 6, 4, 2);
app.VMs.push(dz);
var vz = new VM('vz', 2, 4, 6);
app.VMs.push(vz);
app.calculateFirstFit();
