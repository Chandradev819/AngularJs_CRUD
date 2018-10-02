using AngularCRUD.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AngularCRUD.Controllers
{
    public class DeptController : Controller
    {
        // GET: /Dept/
        string msg = string.Empty;
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Get_AllDepts()
        {
            using (Database1Entities obj = new Database1Entities())
            {
                var  objDept = obj.FetchDeptDetails().ToList();
                return Json(objDept, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Get_DeptById(string Id)
        {
            using (Database1Entities obj = new Database1Entities())
            {
                int DeptId = int.Parse(Id);
                return Json(obj.FetchDept_OnId(DeptId), JsonRequestBehavior.AllowGet);
            }
        }

        public string Insert_Dept(tblDept dept)
        {
            if (dept != null)
            {

                using (Database1Entities obj = new Database1Entities())
                {
                    int flag= obj.InsertDept(dept.DeptName,dept.DeptDesc);
                    if (flag==1)
                    {
                      msg=  "Dept details Added Successfully";
                    }
                    return msg;
                }
            }
            else
            {
                return "Dept Details Not Inserted! Try Again";
            }

        }

        public string Update_Dept(tblDept Dept)
        {
            if (Dept != null)
            {
                
                using (Database1Entities Obj = new Database1Entities())
                {
                    int flag = Obj.UpdateDept(Dept.Id, Dept.DeptName, Dept.DeptDesc);
                    if (flag==1)
                    {
                        msg = "Dept details Updated Successfully";
                    }
                    return msg;
                }
            }
            else
            {
                return "Dept Details Not Updated! Try Again";
            }
        }  

        public string Delete_Dept(tblDept dept) 
        {
            if (dept != null)
            {
               
                using (Database1Entities obj = new Database1Entities())
                {
                   
                   int flag= obj.DeleteDept(dept.Id);

                   if (flag==1)
                   {
                       msg= "Dept details deleted Successfully";
                   }
                   return msg;
                }
            }
            else
            {
                return "Dept Details Not Deleted! Try Again";
            }
        }
    }
}
