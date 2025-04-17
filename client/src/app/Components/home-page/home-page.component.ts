import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  features = [
    {
      title: 'Efficiency',
      description:
        'Our tools are designed to save you time, allowing you to complete tasks with ease and speed.',
    },
    {
      title: 'Cost-Effective',
      description:
        'With WebToolz, you gain access to a wide range of services without breaking the bank.',
    },
    {
      title: 'Easy-to-Use',
      description:
        'Our platform is intuitive, user-friendly, and doesn’t require any technical knowledge to get started.',
    },
    {
      title: 'Fast Performance',
      description:
        'Our tools are optimized for speed, ensuring minimal load times and instant results no matter your device.',
    },
    {
      title: 'Global Reach',
      description:
        'WebToolz serves users in over 100 countries, making our services accessible to everyone, everywhere.',
    },
    {
      title: 'Secure & Private',
      description:
        'We prioritize your privacy. All tools are designed with top-notch security measures to keep your data safe.',
    },
    {
      title: 'Constantly Evolving',
      description:
        'We are always adding new tools and updating existing ones based on user feedback and the latest technology trends.',
    },
    {
      title: 'No Installation Needed',
      description:
        'All our tools are fully online—no downloads, no installations. Just open your browser and start using.',
    },
    {
      title: '24/7 Support',
      description:
        'Have a question or issue? Our support team is available around the clock to assist you.',
    },
  ];

  Tools: number = 0;
  Rating: number = 0;
  Users: number = 0;

  UsersTarget: number = 50000;
  ToolsTarget: number = 15;
  RatingTarget: number = 10;

  interval: any = null;

  ngOnInit(): void {
    this.intervalAnimate();
  }

  intervalAnimate(): void {
    this.Tools = 0;
    this.Rating = 0;
    this.Users = 0;

    this.interval = setInterval(() => {
      if (this.Tools < this.ToolsTarget) {
        this.Tools += 1;
        if (this.Tools > this.ToolsTarget) this.Tools = this.ToolsTarget;
      }

      if (this.Rating < this.RatingTarget) {
        this.Rating += 1;
        if (this.Rating > this.RatingTarget) this.Rating = this.RatingTarget;
      }

      if (this.Users < this.UsersTarget) {
        this.Users += 1000;
        if (this.Users > this.UsersTarget) this.Users = this.UsersTarget;
      }

      if (
        this.Tools >= this.ToolsTarget &&
        this.Rating >= this.RatingTarget &&
        this.Users >= this.UsersTarget
      ) {
        clearInterval(this.interval);
        this.interval = null;

        setTimeout(() => {
          this.intervalAnimate();
        }, 5555);
      }
    }, 1000 / 50);
  }
}
