import { Link } from "react-router-dom";
import { AdminHeader } from "../adminheader/adminHeader";
import "./adminCategory.css"
import axios from "axios";
import CategoryInformation from "./category_information";
import { useEffect, useState } from "react";

export function AdminCategoryPanel() {
    const [categories,setCategories] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCategory = categories.filter((item) =>
      item.category_name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const fetchCategory = async () => {
        await axios.get("http://localhost:4500/categories", {
          headers: {
            Authorization: localStorage.getItem("admin")
          }
        }).then((res) => {
          setCategories(res.data.data)
        })
      }
      useEffect(()=>{
        fetchCategory()
      },[])

    return (
        <div>
            <AdminHeader />
            <div className="category_container">
                <div className="addcategory">  <Link className="addcategory_link" to="/admin/categories/addCategory">Add Category</Link></div>
                <input type="text" placeholder="enter category name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <div className="category_list">
                  {
                    filteredCategory.map((item) =>{
                     const {category_id,category_name} = item;
                     return (
                      <div className="cateogry" key={category_id}>
                        <CategoryInformation 
                        category_id={category_id}
                        category_name={category_name}
                        />
                      </div>
                     )
                    })
                  }
                </div>
            </div>
        </div>
    )
}