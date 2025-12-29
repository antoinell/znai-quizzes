package org.testingisdocumenting.znai.extensions.quiz;

import org.testingisdocumenting.znai.core.AuxiliaryFile;
import org.testingisdocumenting.znai.core.ComponentsRegistry;
import org.testingisdocumenting.znai.extensions.PluginParams;
import org.testingisdocumenting.znai.extensions.PluginParamsDefinition;
import org.testingisdocumenting.znai.extensions.PluginResult;
import org.testingisdocumenting.znai.extensions.include.IncludePlugin;
import org.testingisdocumenting.znai.parser.ParserHandler;
import org.testingisdocumenting.znai.search.SearchScore;
import org.testingisdocumenting.znai.search.SearchText;

import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class QuizIncludePlugin implements IncludePlugin {
    private Path quizPath;
    private String content;

    @Override
    public String id() {
        return "quiz";
    }

    @Override
    public IncludePlugin create() {
        return new QuizIncludePlugin();
    }

    @Override
    public PluginParamsDefinition parameters() {
        return QuizPluginParams.definition;
    }

    @Override
    public PluginResult process(ComponentsRegistry componentsRegistry, ParserHandler parserHandler, Path markupPath, PluginParams pluginParams) {
        quizPath = componentsRegistry.resourceResolver().fullPath(pluginParams.getFreeParam());
        content = componentsRegistry.resourceResolver().textContent(quizPath);

        Map<String, Object> props = new LinkedHashMap<>(pluginParams.getOpts().toMap());
        props.put("quizz", content);

        return PluginResult.docElement("ZnaiQuiz", props);
    }

    @Override
    public Stream<AuxiliaryFile> auxiliaryFiles(ComponentsRegistry componentsRegistry) {
        return Stream.of(AuxiliaryFile.builtTime(quizPath));
    }

    @Override
    public List<SearchText> textForSearch() {
        return List.of(SearchScore.STANDARD.text(this.content));
    }

}
