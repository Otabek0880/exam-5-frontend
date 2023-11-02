import { Routes, Route } from "react-router-dom"
import SignUp from "./components/register/signUp/signUp"
import SignIn from "./components/register/signIn/signIn"
import SeeBooks from "./components/books/books/seeBooks"
import Profile from "./components/profile/profile"
import Security from "./components/profile/security"
import FullInfo from "./components/books/books/bookInfo"
import { AdminBookPanel } from "./components/admin/adminBook/adminBook"
import { AddBook } from "./components/admin/addBook/addBook"
import { AdminCategoryPanel } from "./components/admin/adminCategory/adminCategory"
import { AddCateogry } from "./components/admin/addCategory/addCategory"
import { CategoryInfo } from "./components/admin/adminCategory/categoryinfo"
import AdminProfile from "./components/admin/adminheader/profile"
import AdminSecurity from "./components/admin/adminheader/security"
import  AdminBookInfo  from "./components/admin/adminBook/adminBookinfo"
import { UpdateBook } from "./components/admin/adminBook/updateBook"
import { ProtectRouterAdmin, ProtectRouterUser } from "./utils/protectRouter"


function App() {
  return <div>
    <Routes>
      <Route path="/login" element={<SignIn/>}/>
    <Route element={<ProtectRouterUser/>}>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/books" element={<SeeBooks/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/security" element={<Security/>}/>
      <Route path="/book/:id" element={<FullInfo />} />
    </Route>

    <Route element={<ProtectRouterAdmin/>}>
    <Route path="/admin/books" element={<AdminBookPanel/>}/>
      <Route path="/admin/books/addBook" element={<AddBook/>}/>
      <Route path="/admin/categories" element={<AdminCategoryPanel/>}/>
      <Route path="/admin/categories/addCategory" element={<AddCateogry/>}/>
      <Route path="/category/:id" element={<CategoryInfo/>}/>
      <Route path="/admin/profile" element={<AdminProfile/>}/>
      <Route path="/admin/security" element={<AdminSecurity/>}/>
      <Route path="/info/book/:id" element={<AdminBookInfo/>}/>
      <Route path="/update/book/:id" element={<UpdateBook/>}/>
    </Route>

     
    </Routes>
  </div>
}

export default App