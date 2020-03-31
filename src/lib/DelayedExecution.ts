/**
 * License: zlib/libpng
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/web-ext-translator
 */

export default class DelayedExecution {
    private callback: () => void;

    private instance: number | null = null;

    constructor(callback: () => void) {
        this.callback = callback;
        this.execute = this.execute.bind(this);
    }

    public restart(ms: number) {
        this.cancel();
        this.instance = window.setTimeout(this.execute, ms);
    }

    public execute() {
        this.cancel();
        this.callback();
    }

    public cancel() {
        if (this.instance) {
            clearTimeout(this.instance);
            this.instance = null;
        }
    }
}
