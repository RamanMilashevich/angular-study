import { Component } from '@angular/core';

@Component({
  selector: 'defer-example',
  standalone: true,
  styles: [
    `
    .spacer {
      height: 6rem;
    }

    .chip {
      border-radius: 999px;
      border: 1px solid rgba(56, 189, 248, 0.4);
      background: rgba(56, 189, 248, 0.12);
      color: inherit;
      padding: 0.25rem 0.75rem;
      cursor: pointer;
    }
    `,
  ],
  template: `
    <section class="example">
      <h3>8) &#64;defer directive</h3>
      <p class="hint">Deferred content renders when the block enters the viewport.</p>

      @defer (on viewport) {
        <div class="card">
          <p><strong>Deferred block loaded</strong></p>
          <p>
            This content was deferred and only rendered when it became visible.
          </p>
        </div>
      } @placeholder {
        <div class="card">
          <p>Placeholder: scroll to load the block.</p>
        </div>
      } @loading {
        <div class="card">
          <p>Loading deferred content...</p>
        </div>
      } @error {
        <div class="card">
          <p>Failed to load deferred content.</p>
        </div>
      }

      <div class="spacer"></div>

      <h4>Defer on interaction</h4>
      <p class="hint">Click the button to render the deferred block.</p>

      @defer (on interaction) {
        <div class="card">
          <p><strong>Interaction-loaded block</strong></p>
          <p>This content appears after you interact with the trigger.</p>
        </div>
      } @placeholder {
        <button type="button" class="chip">Click to load deferred content</button>
      }

      <h4>Defer on timer</h4>
      <p class="hint">Wait 2 seconds to see this block render.</p>

      @defer (on timer(2000ms)) {
        <div class="card">
          <p><strong>Timer-loaded block</strong></p>
          <p>Loaded after a 2-second delay.</p>
        </div>
      } @placeholder {
        <div class="card">
          <p>Waiting for timer...</p>
        </div>
      }
    </section>
  `,
})
export class DeferExampleComponent {}
