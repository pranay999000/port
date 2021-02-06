import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import {storage, database} from '../firebase/config'

const useStorage = (image, pageNo, s, p) => {
    const [url, setUrl] = useState('')

    const branch = localStorage.getItem('branch')
    const batch = localStorage.getItem('batch')

    useEffect(() => {
        Object.keys(image).forEach(key => {
            console.log('key', key)
        
        const storageRef = storage.ref(`images/${branch}/${batch}/${s}/${p}/${uuidv4()}-${s}-${p}`)
        const databaseRef = database.ref(`port/${branch}/${batch}/prac/${s}/${p}/`)
        const subStoreRef = database.ref(`port/${branch}/${batch}/subs/`)
        const navStoreRef = database.ref(`port/${branch}/${batch}/nav/${s}/`)

        storageRef.put(image[key]).on('state_changed', (snap) => {
        }, (error) => {
            console.log(error)
        }, async() => {
            const url = await storageRef.getDownloadURL()
            setUrl(url)

            const ref = databaseRef.push({
                image: url
            })
            databaseRef.child(ref.key).update({
                pageNo: 100,
                key: ref.key
            })
            subStoreRef.orderByValue().equalTo(s).limitToFirst(1).once('value', snap => {
                if(!snap.exists()){
                    subStoreRef.push(s)
                }
            })
            navStoreRef.orderByChild('no').equalTo(p).limitToFirst(1).once('value', snap => {
                if(!snap.exists()){
                    const navStore = {
                        no: p,
                        from: s
                    }
                    navStoreRef.push(navStore)
                }
            })
        })

        })
    }, [image, branch, batch, pageNo, s, p])

    return {url}
}

export default useStorage

// computer_science: {
//     19: {
//         prac: {
//             pracSub: {
//                 1: {
//                     id1: {
//                         image: url
//                         pageNo: 1
//                     }
//                     id2: {
//                         image: url
//                         pageNo: 2
//                     }
//                 }
//             }
//         }
//     }
// }

// computer_science: {
//     19: {
//         subs: {
//             id1: sub1
//             id2: sub2
//         }
//         nav: {
//             sub1: {
//                 id1: {
//                      from: sub1
//                      no: 1
//                 }
//                 id2: {
//                      from: sub1
//                      no: 2
//                 }
//             }
//         }
//     }
// }