import { Component, OnInit } from '@angular/core';
import { IProduto, produtos } from '../produtos';
import { ProdutosService } from '../produtos.service';
import { CarrinhoService } from '../carrinho.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: IProduto[] | undefined;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    /* this.produtos = this.produtosService.getAll(); */
    const produtos = this.produtosService.getAll();
    this.route.queryParamMap.subscribe(params => {
      const descricao = params.get('descricao')?.toLowerCase();

      if(descricao) {
        this.produtos = produtos.filter(produto => produto.descricao.toLowerCase().includes(descricao))
      } else {
        this.produtos = produtos
      }
    })
  }

}
