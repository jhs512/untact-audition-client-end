import { alertController } from "@ionic/vue";

export function isEmptyObject(param: {}) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

export function toInt(data: any, defaultValue: any) {
  if ( data == null ) {
    return defaultValue;
  }

  return parseInt(data)
}

export function toIntOrUnd(data: any) {
  return toInt(data, undefined);
} 

export function toIntOrNull(data: any) {
  return toInt(data, null);
}

export function toStringOrNull(data:any) {
  if ( data == null ) {
    return null;
  }

  if ( data == "null" ) {
    return null;
  }

  return data;
}

export async function showAlert(title:string,msg:string, method:any|null) {
  const alert = await alertController
  .create({
    header: title,
    message: msg,
    buttons:[  
    {
      text: '확인',
      handler: () => {
        method();
    }
  }
  ]
  });
return alert.present();
}