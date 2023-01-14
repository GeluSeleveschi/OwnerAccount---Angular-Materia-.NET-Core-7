import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../../account.model';

@Component({
  selector: 'app-owner-accounts',
  templateUrl: './owner-accounts.component.html',
  styleUrls: ['./owner-accounts.component.scss']
})
export class OwnerAccountsComponent implements OnInit {
  @Input() accounts: Account[];
  @Output() onClickAccount: EventEmitter<Account> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onAccountClick(account: Account) {
    this.onClickAccount.emit(account);
  }
}
