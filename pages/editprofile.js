import EditProfilePage from '@/components/template/EditProfilePage'
import React from 'react'
import { getSession } from 'next-auth/react'
export default function editprofile() {
  return (
    <>
    <EditProfilePage/>
    </>
  )
}
export async function  getServerSideProps({req}){
    const session = await getSession({req})
  
    if(!session){
      return{
        redirect:{
          destination:"/signin",
          permanent:false
        }
      }
    }
    return {
      props:{}
    }
  
  }