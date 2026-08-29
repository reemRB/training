// ! Option B with rxMethod
  // public fetchQuote = rxMethod(
  //    pipe(tap(()=>{
  //     this.isLoading.set(true)
  //     this.error.set(null)
  //   }),
  //   switchMap(()=>{
  //     return this.quoteService.getRandomQuote().pipe(
  //       tap((quote) =>{
  //         this.quote.set(quote)
  //         this.isLoading.set(false)
  //       }),
  //       catchError((error)=>{
  //         this.isLoading.set(false);
  //         this.error.set(`Error retreiving data ${error}`)
  //         return of(null)
  //       })
  //     )
  //   })
  //  )
  // )

  //! Option A with firstValue from
  // public async fetchQuotes() {
  //   this.isLoading.set(true);
  //   this.error.set(null);
  //   try {
  //     const quoteInfo = await firstValueFrom(
  //       this.quoteService.getRandomQuote(),
  //     );
  //     this.quote.set(quoteInfo);
  //   } catch (error) {
  //     this.error.set(`there was an error retrieving the data ${error}`);
  //   } finally {
  //     this.isLoading.set(false);
  //   }
  // }