//Converting images to string(base64)
export default function convertToBase64(upload){
  return  new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(upload);
    fileReader.onload=()=>{
         resolve(fileReader.result)
    }
    fileReader.onerror=(error)=>{
        reject(error)
    }
  })
}