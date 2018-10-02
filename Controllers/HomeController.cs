using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularCRUD.Models;

namespace AngularCRUD.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Get_AllEmployee()
        {
            using (Database1Entities obj = new Database1Entities())
            {
                List<Employee> emp = obj.Employees.ToList();
                return Json(emp, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Get_EmployeeById(string Id)
        {
            using (Database1Entities obj = new Database1Entities())
            {
                int EmpId = int.Parse(Id);
                return Json(obj.Employees.Find(EmpId), JsonRequestBehavior.AllowGet);
            }
        }

        public string Insert_Employee(Employee emp)
        {
            if (emp != null)
            {

                using (Database1Entities obj = new Database1Entities())
                {
                    obj.Employees.Add(emp);
                    obj.SaveChanges();
                    return "Employee Added Successfully";  
                }
            }
            else
            {
                return "Employee Not Inserted! Try Again";
            }  

        }

        public string Delete_Employee(Employee emp)
        {
            if (emp != null)
            {

                using (Database1Entities obj = new Database1Entities())
                {
                    
                    //one approach to find the EmpId
                    Employee EmpObj = obj.Employees.Find(emp.Emp_Id);
                    //Other approach
                    //Employee EmpObj = obj.Employees.Where(x => x.Emp_Id == emp.Emp_Id).FirstOrDefault();
                    obj.Employees.Remove(EmpObj);
                    obj.SaveChanges();
                    return "Employee deleted Successfully";
                }
            }
            else
            {
                return "Employee Not Deleted! Try Again";
            }  
        }

        public string Update_Employee(Employee Emp)
        {
            if (Emp != null)
            {
                using (Database1Entities Obj = new Database1Entities())
                {
                    var Emp_ = Obj.Entry(Emp);
                    Employee EmpObj = Obj.Employees.Where(x => x.Emp_Id == Emp.Emp_Id).FirstOrDefault();
                    EmpObj.Emp_Age = Emp.Emp_Age;
                    EmpObj.Emp_City = Emp.Emp_City;
                    EmpObj.Emp_Name = Emp.Emp_Name;
                    Obj.SaveChanges();
                    return "Employee Updated Successfully";
                }
            }
            else
            {
                return "Employee Not Updated! Try Again";
            }
        }  
    }
}
