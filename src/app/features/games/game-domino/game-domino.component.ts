import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/dominos/modal/modal.component';

interface Domino {
  id: number;
  position: { top: string; left: string };
  fallen: boolean;
}

interface PuzzleSet {
  dominos: Domino[];
  puzzle: { question: string; answer: string };
}

@Component({
  selector: 'app-game-domino',
  templateUrl: './game-domino.component.html',
  styleUrls: ['./game-domino.component.scss']
})
export class GameDominoComponent implements OnInit {
  puzzleSets: PuzzleSet[] = [
    {
      puzzle: { question: "What has hands but can't clap?", answer: "clock" },
      dominos: this.generateDominosCluster(1),
    },
    {
      puzzle: { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
      dominos: this.generateDominosCluster(2),
    },
    {
      puzzle: { question: "I am not alive, but I grow. What am I?", answer: "fire" },
      dominos: this.generateDominosCluster(3),
    }
  ];

  currentSetIndex = 0;
  dominos: Domino[] = [];

  userAnswer = '';
  feedback = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.loadCurrentDominos();
    this.openPuzzleDialog();
  }

  loadCurrentDominos() {
    this.dominos = this.puzzleSets[this.currentSetIndex].dominos.map(d => ({ ...d, fallen: false }));
  }

  generateDominosCluster(seed: number): Domino[] {
    return [
      { id: seed * 10 + 1, position: { top: '40vh', left: '40vw' }, fallen: false },
      { id: seed * 10 + 2, position: { top: '40vh', left: '48vw' }, fallen: false },
      { id: seed * 10 + 3, position: { top: '48vh', left: '44vw' }, fallen: false },
      { id: seed * 10 + 4, position: { top: '48vh', left: '52vw' }, fallen: false },
      { id: seed * 10 + 5, position: { top: '56vh', left: '46vw' }, fallen: false },
    ];
  }

  openPuzzleDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '360px',
      data: { puzzle: this.puzzleSets[this.currentSetIndex].puzzle }
    });

    dialogRef.afterClosed().subscribe(answer => {
      if (answer?.trim().toLowerCase() === this.puzzleSets[this.currentSetIndex].puzzle.answer.toLowerCase()) {
        this.fallDominosAnimation();
      } else {
        this.openPuzzleDialog(); // retry
      }
    });
  }

  fallDominosAnimation() {
    let i = 0;
    const fallInterval = setInterval(() => {
      if (i >= this.dominos.length) {
        clearInterval(fallInterval);
        this.nextPuzzleOrEnd();
        return;
      }
      this.dominos[i].fallen = true;
      i++;
    }, 400);
  }

  nextPuzzleOrEnd() {
    if (this.currentSetIndex + 1 < this.puzzleSets.length) {
      this.currentSetIndex++;
      this.loadCurrentDominos();
      this.openPuzzleDialog();
    } else {
      alert('🎉 Congratulations! You solved all domino puzzles!');
    }
  }
}
