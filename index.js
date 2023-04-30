function createEmployeeRecord(employee){
    const record = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return record;
}

function createEmployeeRecords(employees){
    const records = [];
   for(let data of employees){
        records.push(createEmployeeRecord(data))
   }
    return records;
}

function createTimeInEvent(time){
    const data = time.split(" ");
    
    const event = {
        type: "TimeIn",
        hour: Number(data[1]),
        date: data[0]
    }
    this.timeInEvents.push(event);
    return this;
}

function createTimeOutEvent(time){
    const data = time.split(" ");
    
    const event = {
        type: "TimeOut",
        hour: Number(data[1]),
        date: data[0]
    }
    this.timeOutEvents.push(event);
    return this;
}

function hoursWorkedOnDate(day){
    const timeIn = this.timeInEvents.find(data => data.date === day);
    const timeOut = this.timeOutEvents.find(data => data.date === day);
    return ((timeOut.hour - timeIn.hour)/100);
}

function wagesEarnedOnDate(day){
    const time = hoursWorkedOnDate.call(this,day);
    const wage = this.payPerHour*time;
    return wage;
}
/*
function allWagesFor(){
    const totalWages = 0;
    for (const day in this.timeInEvents){
        //console.log(day.date);
        totalWages = totalWages + wagesEarnedOnDate(day.date);
    }
    return totalWages;
}
*/

/* 
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(record,name){
    const namae = record.find(namae => namae.firstName === name)
    if(namae){
        return  namae;
    }
    else{
        return undefined;
    }
}

function calculatePayroll(records){
    const reducer1 = (accumulator, pay) => {
        const reducer2 = (accumulator, time) => {
            //console.log(accumulator,time);
            return accumulator += hoursWorkedOnDate.call(pay,time.date)
        }
        const hours = pay.timeInEvents.reduce(reducer2,0)
        //console.log(accumulator,pay,hours);
        return accumulator += (pay.payPerHour*hours);
    }
    const wages = records.reduce(reducer1,0);
    return wages; 
}