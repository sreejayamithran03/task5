import { Component, ViewChild, ViewContainerRef, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TournamentsService } from '../service/tournaments.service';
// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})



export class TournamentsComponent implements OnInit {
  // words2 = [{ value: 'word1' }, { value: 'word2' }, { value: 'word3' }, { value: '' }];
  apartments: any;

  // apartment: any;
  add() {
    console.log("hellow");
    // console.log(this.words2);
    //  this.words2.push({value: ''});   
  }


  totalPrice: any
  totalp: number = 0
  subtotal: number = 0;
  subtotals: number = 0;
  subtotalss: number = 0;
  grand: number = 0;

  // @ViewChild('inputContainer', { read: ViewContainerRef })
  // container!: ViewContainerRef;
  inputBoxes: any[] = [];
  inputBoxess: any[] = [];
  inputBoxesss: any[] = [];
  // qtyValues: number[] = [];
  // fromDateValues: string[] = [];
  // toDateValues: string[] = [];
  // totalValues: number[] = [];
  // quantity = 2



  calculate_totalprice(todatevalue: any, fromdate: any, quantity: any) {
    console.log(todatevalue);
    console.log(fromdate);
    console.log(quantity);
  }



  tournaments: any[] = [];
  seltournament: any[] = [];
  seltournamentsub: any[] = [];
  selectedTournaments: any = [];
  apartmentData: any[] = [];
  apartment123: any[] = [];
  tournament1: any[] = [];
  grooms1: any[] = [];
  villas1: any[] = []
  vilasData: any[] = []
  groomsData: any[] = []
  tournamentlist: any;
  tournamentsform: FormGroup;
  formBuilder: any;
  tournament: any;
  appartmentarray: any[] = []
  groomarray: any[] = []
  villasarray: any[] = []
  tournamentarray: any[] = []
  finalarray: any




  constructor(private fb: FormBuilder, private http: HttpClient) {
    // this.inputBoxes = [];
    this.tournamentlist = [];
    this.tournamentsform = this.fb.group({
      teamname: new FormControl('', [Validators.required]),
      teammanager: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      noofpersons: ['', Validators.required],
      grand: ['', Validators.required],


    }
    )
  }



  ngOnInit(): void {
    this.http.get<any[]>('assets/Data/tournament.json').subscribe(data => {
      this.tournaments = data;
    });
    this.getApartmentData();
    this.getvillasData();
    this.getgroomsData();
    // this.buildForm();
  }

  getApartmentData() {
    this.http.get<any[]>('assets/Data/apartments.json').subscribe((data) => {
      this.apartmentData = data;
    });
  }

  getgroomsData() {
    this.http.get<any[]>('assets/Data/grooms.json').subscribe((data) => {
      this.groomsData = data;
    });
  }
  getvillasData() {
    this.http.get<any[]>('assets/Data/villas.json').subscribe((data) => {
      this.vilasData = data;
    });
  }

  total(qty: any, apartment: any, fdate: any, tdate: any, tp: any) {

    let fromdate = new Date(fdate)
    let todate = new Date(tdate)
    let difference = todate.getTime() - fromdate.getTime()
    let nodays = Math.floor(difference / (1000 * 60 * 60 * 24))
    if (nodays < 30) {
      this.totalPrice = qty * apartment.monthlyPrce
    }
    else {
      let onedayprice = apartment.monthlyPrce / 30
      this.totalPrice = qty * onedayprice * nodays
    }
    tp.value = this.totalPrice
    this.subtotal += this.totalPrice
    this.grand += this.subtotal
    apartment.qty = qty
    apartment.fdate = fdate
    apartment.tdate = tdate
    apartment.totalPrice = this.totalPrice
    this.apartment123 = apartment
    //  console.log("apartment123",this.apartment123, qty,fdate,tdate,this.totalPrice,this.subtotal,this.grand)
    //  console.log(this.apartment123);


  }


  totals(quty: any, grooms: any, frdate: any, tdate: any, tprice: any) {
    let fromdate = new Date(frdate)
    let todate = new Date(tdate)
    let difference = todate.getTime() - fromdate.getTime()
    let nodays = Math.floor(difference / (1000 * 60 * 60 * 24))
    if (nodays < 30) {
      this.totalPrice = quty * grooms.price
    }
    else {
      let onedayprice = grooms.price / 30
      this.totalPrice = quty * onedayprice * nodays
    }
    tprice.value = this.totalPrice
    this.subtotals += this.totalPrice
    this.grand += this.subtotals
    grooms.quty = quty
    grooms.frdate = frdate
    grooms.tdate = tdate
    grooms.totalPrice = this.totalPrice
    this.grooms1 = grooms
    // console.log("grooms",this.grooms1,quty ,frdate,todate,this.totalPrice,this.subtotals,this.grand)


  }



  totalss(quantity: any, vilas: any, frmdate: any, tosdate: any, totalsprice: any) {
    let fromdate = new Date(frmdate)
    let todate = new Date(tosdate)
    let difference = todate.getTime() - fromdate.getTime()
    let nodays = Math.floor(difference / (1000 * 60 * 60 * 24))
    if (nodays < 365) {
      this.totalPrice = quantity * vilas.yearlyPrice
    }
    else {
      let onedayprice = vilas.yearlyPrice / 365
      this.totalPrice = quantity * onedayprice * nodays
    }
    totalsprice.value = this.totalPrice
    this.subtotalss += this.totalPrice
    this.grand += this.subtotalss
    vilas.quantity = quantity
    vilas.frmdate = frmdate
    vilas.tosdate = tosdate
    vilas.totalPrice = this.totalPrice
    this.villas1 = vilas
    //  console.log("villas",this.villas1,quantity,frmdate,tosdate,this.totalPrice,this.subtotalss,this.grand);

  }






  // buildForm() {
  //   this.tournamentsform = new FormGroup({
  //     name: new FormControl(''),
  //     lastName: new FormControl(''),
  //     age: new FormControl(''),
  //   });
  // }
  // buildForm(){
  //   const formGroupFields = this.getFormControlsFields();
  //   this.tournamentsform = new FormGroup(formGroupFields)
  // }
  // getFormControlsFields(){
  //   const formGroupFields= {};
  //   for(const field of Object(this.model)){
  //     formGroupFields[field] = new FormControl("");
  //     this.fields.push(field);
  //   }
  //   return formGroupFields;
  // }




  get teamname() {
    return this.tournamentsform.get('teamname')
  }
  get teammanager() {
    return this.tournamentsform.get('teammanager')
  }
  get country() {
    return this.tournamentsform.get('country')
  }
  get email() {
    return this.tournamentsform.get('email')
  }
  get phone() {
    return this.tournamentsform.get('phone')
  }


  getTournamentName(selectedTournamentId: number): string {
    const tournament = this.tournaments.find(t => t.tournamentId === selectedTournamentId);
    return tournament ? tournament.tournamentName : '';
  }

  getTournamentStartDate(selectedTournamentId: number): string {
    const tournament = this.tournaments.find(t => t.tournamentId === selectedTournamentId);
    return tournament ? tournament.startDate : '';
  }

  getTournamentFee(selectedTournamentId: number): number {
    const tournament = this.tournaments.find(t => t.tournamentId === selectedTournamentId);
    return tournament ? tournament.tournamentFee : 0;
  }

  getTournamentEndDate(selectedTournamentId: number): string {
    const tournament = this.tournaments.find(t => t.tournamentId === selectedTournamentId);
    return tournament ? tournament.endDate : '';
  }



  addInputBox() {
    this.inputBoxes.push({ apartmentTypeName: '', quantity: 0, monthlyPrice: 0, fromDate: '', toDate: '', total: 0 });
  }
  addInputBoxs(): void {
    this.inputBoxess.push({ type: '', quantity: null, monthlyPrice: null, fromDate: '', toDate: '', total: null });
  }
  addInputBoxss(): void {
    this.inputBoxesss.push({ type: '', quantity: null, monthlyPrice: null, fromDate: '', toDate: '', total: null });
  }


  onCheckboxChange(tournamentId: number, tournament: any) {
    const index = this.selectedTournaments.indexOf(tournamentId);
    if (index === -1) {
      this.seltournament = tournament
      this.selectedTournaments.push(tournamentId);

    } else {
      this.seltournament.splice(index, 1)

      this.selectedTournaments.splice(index, 1);
    }
    // this.tournament1.push(tournament)

  }
  // onCheckboxChange(tournamentId: number,tournament:any) {
  //   const index = this.selectedTournaments.indexOf(tournamentId);
  //   if (index === -1) {
  //     // this.tournaments.push(tournament)
  //     this.selectedTournaments.push(tournamentId);

  //   } else {
  //     // this.tournaments.splice(index,1)
  //     this.selectedTournaments.splice(index, 1);
  //   }
  // }


  reset() {
    this.tournamentsform.reset();
  }
  submit() {
    this.tournamentlist.push(this.tournamentsform.value);
    this.tournamentsform.reset();
    this.appartmentarray.push(this.apartment123)
    this.groomarray.push(this.grooms1)
    this.villasarray.push(this.villas1)
    this.seltournamentsub.push(this.seltournament)

    this.tournament = this.tournament
    this.finalarray = {
      appartment: this.appartmentarray,
      grooms: this.groomarray,
      villa: this.villasarray,
      teamlist: this.tournamentlist,
      tournament: this.seltournamentsub



    }





    const jsonString = JSON.stringify(this.finalarray)
    console.log(jsonString)



    //  if("!qty" || "!fdste"){
    //   alert('Please fill in all the fields');
    //   return;
    //  }


  }
}








