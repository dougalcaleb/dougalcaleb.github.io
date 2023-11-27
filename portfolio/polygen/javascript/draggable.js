export class Draggable {
   root = null;

   constructor(trigger, toDrag = null) {

      this.trigger = trigger;
      this.toDrag = toDrag || trigger;

      this.offset = { x: null, y: null };
      this.dragging = false;

      this.aborts = {
         general: new AbortController(),
         live: new AbortController()
      };

      this.#addListeners();

      return null;
   }

   #addListeners() {
      this.trigger.addEventListener("mousedown", (event) => {
         event.preventDefault();
         this.dragging = true;
         this.offset = {
            x: this.trigger.getBoundingClientRect().x - event.clientX,
            y: this.trigger.getBoundingClientRect().y - event.clientY,
         }
      }, {signal: this.aborts.general.signal });

      this.#addLiveListeners();
   }

   #addLiveListeners() {
      document.body.addEventListener("mousemove", (event) => {
         if (!this.dragging) return;
         event.preventDefault();
         this.toDrag.style.transform = `translate(${event.clientX + this.offset.x}px, ${event.clientY + this.offset.y}px)`;
      }, { signal: this.aborts.live.signal });

      document.body.addEventListener("mouseup", (event) => {
         if (!this.dragging) return;

         this.dragging = false;
         this.#resetListeners();

      }, { signal: this.aborts.live.signal });
   }

   #resetListeners() {
      this.aborts.live.abort();
      this.aborts.live = new AbortController();
      this.#addLiveListeners();
   }

   destroy() {
      this.aborts.live.abort();
      this.aborts.general.abort();
      this.toDrag = null;
      this.trigger = null;
      this.dragging = false;
   }
}