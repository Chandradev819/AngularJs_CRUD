/// <reference path="Module.js" />
app.service("EmpCRUDServie", function ($http) {
    debugger;
    //Get all the Emp Details
    this.getEmps = function () {
        return $http.get("http://localhost:51374/Home/Get_AllEmployee");
    }
    // Get the specific emp details
    this.getEmp = function (Emp_Id) {
        var response = $http({
            method: "post",
            url: "http://localhost:51374/Home/Get_EmployeeById",
            param: {
                Emp_Id: JSON.stringify(Emp_Id)
            }
        });
        return response;
    }

    //For updating the Emp details
    this.updateEmp = function (emp) {
        var response = $http({
            method: "post",
            url: "http://localhost:51374/Home/Update_Employee",
            data: JSON.stringify(emp),
            dataType: "json"
        });
        return response;
    }

    // For adding the record
    this.addEmp = function (emp) {
        var response = $http({
            method: "post",
            url: "http://localhost:51374/Home/Insert_Employee",
            data: JSON.stringify(emp),
            dataType: "json"
        });
        return response;

    }

    this.deleteEmp = function (empId) {
        var response = $http({
            method: "post",
            url: "http://localhost:51374/Home/Delete_Employee",
            param: {
                Emp_Id: JSON.stringify(empId)
            }
        });
        return response;
    }

    });
