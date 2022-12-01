import { Component, OnInit } from '@angular/core';
import { DefaultValueAccessor, FormBuilder, FormControl, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';



@Component({
  selector: 'app-admin-caf1',
  templateUrl: './admin-caf1.component.html',
  styleUrls: ['./admin-caf1.component.css']
})

export class AdminCaf1Component implements OnInit {

  productos: any[] = [];
  pedidos: any[] = [];
  entregados: any[] = [];
  agregar: FormGroup;
  actualizar: FormGroup;
  constructor(private fb: FormBuilder,
    private firestore: Firestore,
    private router: Router,

  ) {
    this.agregar = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],

    })
    this.actualizar = this.fb.group({
      nombreA: ['', Validators.required],
      precioA: ['', Validators.required],
    })

  }

  async ngOnInit(): Promise<void> {

    onSnapshot(collection(getFirestore(), 'orders'), async (e) => {


      const pedidosBD = getDocs(collection(getFirestore(), 'orders'))
      this.pedidos = [];
      ; (await pedidosBD).forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);


        const nombre = doc.get('nombre')
        const pedido = doc.get('pedido')
        const total = doc.get('total')
        const estatus = doc.get('entregado')
        const id = (doc.id)
        if(estatus==false){
        this.pedidos.push({
          nombre, pedido, total, estatus, id
        })}

      });

    });

    onSnapshot(collection(getFirestore(), 'menu'), async (e) => {
      const tabla = getDocs(collection(getFirestore(), 'menu'))
      this.productos = [];
      ; (await tabla).forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);

        const nombre = doc.get('nombre')
        const precio = doc.get('precio')
        const id = (doc.id)

        this.productos.push({
          nombre, precio, id
        })
      });
    });
  }

  async agregarM() {
    const nombre = this.agregar.value.nombre;
    const precio = this.agregar.value.precio;

    const tabla = getDocs(collection(getFirestore(), 'menu'))
    var valid = true;
    ; (await tabla).forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      if (doc.get('nombre') == nombre) {
        valid = false;
      }
    });
    if ((nombre && precio != null) && (valid && precio>0)) {
      addDoc(collection(getFirestore(), 'menu'), { nombre: nombre, precio: precio })
      onSnapshot(collection(getFirestore(), 'menu'), (e) => {

      });
    }else if(precio<=0){
      alert("El precio debe ser mayor que 0")
    }else if(nombre==""){
      alert("El nombre no puede estar vacio")
    }
  }


  async eliminarMenu(id: string) {

    await deleteDoc(doc(getFirestore(), 'menu', id));
    console.log('Esto esta en el id ', id);
  }

  editarMenu(id: string, nombre: string, precio: string) {
    console.log(nombre);
    console.log(precio);

    this.actualizar = this.fb.group({
      nombreA: [nombre, Validators.required],
      precioA: [precio, Validators.required],
      id: [id]
    })
  }

  async actualizarEstado(id:string,estatus:boolean,nombre:string,total:string,pedido:string) {
    if (estatus != true) {
      await updateDoc(doc(getFirestore(), 'orders', id), "entregado", true)
        .then(docRef => {
          console.log("Value of an Existing Document Field has been updated", id);
          estatus=true;
          this.entregados.push({
           
            nombre, total, pedido,id,estatus
          })
        })
        .catch(error => {
          console.log(error, id);
        })
    }

  }
  vaciarEntrega(){
    
    this.entregados=[];
  }

  async actualizarMenu() {
    const nombre = this.actualizar.value.nombreA;
    const precio = this.actualizar.value.precioA;
    const id = this.actualizar.value.id;

    if (nombre && precio != "") {
      await updateDoc(doc(getFirestore(), 'menu', id), "nombre", nombre, "precio", precio)

     }else if(nombre==""){
      alert('El nombre no puede estar vacio')
     }else if(precio==null){
      alert('El precio no puede eatar vacio')
     }else if(precio<=0){
      alert('el precio debe ser mayor a 0')
     }

  }
}
