import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  //Dentro da variavel data poderao ser passados 3 variaveis. Exemplo no fim da pagina
  //message -> que sera a mensagem exibida ao usuario
  //confirmButton -> Se terao botoes de confirmcao ou nao (true or false)
  //answer -> que seria uma funcao a ser executada quando apertado ok
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  responseUser() {
    if (this.data.confirmButton)
      this.data.answer()

    this._bottomSheet.dismiss()
  }

  close() {
    this._bottomSheet.dismiss()
  }
}





// EXAMPLE:
    //this._confirmationSheet.open(ConfirmationComponent, {
    //   data: {
    //     message: "Are you sure do you want delete this perfil? All your datas will be lost",
    //     confirmButton: true,
    //     answer: () => {
    //       this._auth.delete(this.user.sub).subscribe(res => {
    //         this.dialogRef.close()
    //         this._router.navigate([''])
    //       })
    //     }
    //   }
    // })
