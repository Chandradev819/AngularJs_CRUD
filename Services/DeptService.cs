using AngularCRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularCRUD.Services
{
    public class DeptServiceController : ApiController
    {
        string msg = string.Empty;
        // GET api/<controller>
        public IEnumerable<tblDept> Get()
        {
            using (Database1Entities obj = new Database1Entities())
            {
                List<tblDept> objDept = obj.FetchDeptDetails().ToList();
                return objDept;
            }
        }

        // GET api/<controller>/5
        public List<tblDept> Get(int Id)
        {
            using (Database1Entities obj = new Database1Entities())
            {
                
                return obj.FetchDept_OnId(Id).ToList();
            }
        }

        // POST api/<controller>
        public string Post([FromBody]tblDept dept)
        {
            if (dept != null)
            {

                using (Database1Entities obj = new Database1Entities())
                {
                    int flag = obj.InsertDept(dept.DeptName, dept.DeptDesc);
                    if (flag == 1)
                    {
                        msg = "Dept details Added Successfully";
                    }
                    return msg;
                }
            }
            else
            {
                return "Dept Details Not Inserted! Try Again";
            }
        }

        // PUT api/<controller>/5
        public string Put(int id, [FromBody]tblDept Dept) 
        {
            if (Dept != null)
            {

                using (Database1Entities Obj = new Database1Entities())
                {
                    int flag = Obj.UpdateDept(Dept.Id, Dept.DeptName, Dept.DeptDesc);
                    if (flag == 1)
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

        // DELETE api/<controller>/5
        public string Delete(tblDept dept)
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