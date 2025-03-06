import { Component } from '@angular/core';
import { Moment } from '../../../Moment';
import { MomentService } from '../../../services/moment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MomentFormComponent } from '../../moment-form/moment-form.component';
import { RouterModule } from '@angular/router';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-edit-moment',
  imports: [CommonModule, MomentFormComponent, RouterModule],
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent {
  moment!: Moment
  btnText: string = 'Editar';


  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
  ) {}

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });
  }
   
  async editHandler(momentData: Moment){
    const id = this.moment.id;

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe()

    this.messagesService.add(`Moment ${id} foi atualizado com sucesso!`)

    this.router.navigate(['/']);
  }
}
