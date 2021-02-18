import { Component, EventEmitter, OnInit, Output } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services';
import { SlideAnimation } from '../../helpers/animation.slide';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss']
})
export class AdvanceComponent implements OnInit {

    @Output() search = new EventEmitter(); 
    searchF: FormGroup; 
    constructor (
        private router: Router,
        private ds: DataService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.searchF = this.fb.group({
            mode: '', 
            hscode: '',            
        });

        const urlParams = combineLatest(
            this.route.params,
            this.route.queryParams,
            (params, queryParams) => ({ ...params, ...queryParams})
        );

        urlParams.subscribe(routeParams => {
            routeParams.mode = this.route.snapshot.routeConfig.path;
            this.searchF.patchValue(routeParams);
        });
    }
    get form() { return this.searchF.controls; }
  
    onSearch(form: FormGroup) {
        this.search.emit(this.searchF);
    }
}
